import { createFilePath } from 'gatsby-source-filesystem'
import { GatsbyNode } from 'gatsby'
import path from 'path'

export const onCreateNode: GatsbyNode['onCreateNode'] = async ({ node, getNode, actions }) => {
	const { createNodeField } = actions
	if (node.internal.type === 'Mdx') {
		const slug = createFilePath({ node, getNode })
		const sourceName = getNode(node.parent).sourceInstanceName
		const prefix = sourceName === 'basepages' ? '' : '/' + sourceName

		createNodeField({
			node,
			name: 'slug',
			value: `${prefix}${slug}`,
		})
		createNodeField({
			node,
			name: 'sourceName',
			value: sourceName,
		})
	}
}

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
	const { createPage } = actions

	return graphql<any>(`
		query GatsbyNodeQuery {
			all: allMdx {
				edges {
					node {
						fields {
							slug
							sourceName
						}
					}
				}
			}
			portfolio: allMdx(filter: { fields: { sourceName: { eq: "portfolio" } } }) {
				edges {
					node {
						id
					}
				}
			}
			limitPost: site {
				siteMetadata {
					portfolioItemsPerPage
				}
			}
		}
	`).then(result => {
		result.data.all.edges.forEach(({ node }) => {
			const template = node.fields.sourceName
			createPage({
				path: node.fields.slug,
				component: path.resolve('./src/templates/' + template + '.tsx'),
				context: {
					slug: node.fields.slug,
				},
			})
		})

		const portfolioItems = result.data.portfolio.edges
		const portfolioItemsPerPage = result.data.limitPost.siteMetadata.portfolioItemsPerPage
		const numPortfolioItems = Math.ceil(portfolioItems.length / portfolioItemsPerPage)

		Array.from({ length: numPortfolioItems }).forEach((_, i) => {
			createPage({
				path: i === 0 ? '/portfolio' : `/portfolio/${i + 1}`,
				component: path.resolve('./src/templates/portfolio-list.tsx'),
				context: {
					limit: portfolioItemsPerPage,
					skip: i * portfolioItemsPerPage,
					numPages: numPortfolioItems,
					currentPage: i + 1,
				},
			})
		})
	})
}
