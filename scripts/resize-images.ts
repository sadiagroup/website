import { join } from 'path'
import { existsSync, mkdirSync, readdirSync } from 'fs'
import { fromFile } from 'file-type'
import sharp from 'sharp'
import vardict from 'vardict'

const DEFAULT_PERCENTAGE = 25
const DEFAULT_DIMENSIONS = 1000

const { d, h, w, p } = vardict

if (d === undefined) {
	console.error('Need to define a directory with `-d` flag.')
	process.exit(1)
}

const parseNumber = (n: string | number | boolean | undefined, fallBack: number): number => {
	if (n === undefined || typeof n === 'boolean') return fallBack
	if (typeof n === 'string') return parseInt(n)
	return n
}

const dirName = d.toString()

readdirSync(dirName)
	.filter(async file => (await fromFile(`${dirName}/${file}`)).mime?.toLowerCase().includes('image') ?? false)
	.forEach(async file => {
		const image = sharp(`${dirName}/${file}`)
		let height, width

		if (p) {
			const percentage = parseNumber(p, DEFAULT_PERCENTAGE)
			const info = await image.metadata()
			height = Math.round((info.height * percentage) / 100)
			width = Math.round((info.width * percentage) / 100)
		} else {
			height = parseNumber(h, DEFAULT_DIMENSIONS)
			width = parseNumber(w, DEFAULT_DIMENSIONS)
		}

		const newDir = join(dirName, p ? 'resized' : `resized-${width}-${height}`)
		try {
			if (!existsSync(newDir)) mkdirSync(newDir)
		} catch (err) {
			console.error(`Could not make new directory ${newDir}.`)
			process.exit(1)
		}

		image.resize(width, height).toFile(`${newDir}/${file}`)
	})
