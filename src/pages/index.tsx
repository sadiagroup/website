/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useRef, useState } from 'react'
import { graphql, PageProps } from 'gatsby'

import { ArrowRight } from 'react-feather'
import ScrollIntoView from 'react-scroll-into-view'
import { Carousel } from 'react-responsive-carousel'
import TextLoop from 'react-text-loop'

import Layout from '../components/layout'
import { Button } from '../components/ui'

import ItemPortfolio from '../components/item-portfolio'
import { Form, Description as ContactDescription } from '../components/contact'
import { IndexPageQuery } from './__generated__/IndexPageQuery'

const IndexPage = ({ data, location }: PageProps<IndexPageQuery>) => {
	const siteData = data.site.siteMetadata

	const portfolioList = data.portfolio.edges
		.sort((a, b) => (a.node.fields.slug > b.node.fields.slug ? 1 : -1))
		.map((item, _) => <ItemPortfolio data={item.node} key={`p-item-index-${item.node.id}`} even={(_ + 1) % 2 === 0} />)

	return (
		<Layout
			front={true}
			seo={{
				title: 'Home',
				description: siteData.description,
			}}
			navPlaceholder={false}
			location={location}
		>
			<Wall data={siteData} />
			{siteData.mission !== '' && <About data={siteData.mission} title="Our Mission" />}
			{siteData.vision !== '' && <About data={siteData.vision} title="Our Vision" />}
			<div className="px-4 lg:px-0" id="portfolio">
				{portfolioList}
			</div>
			<Contact data={siteData.contact} />
		</Layout>
	)
}

const Wall = ({ data }) => {
	const wall = useRef(null)

	const twoColumnWall = data.twoColumnWall

	const [state, changeState] = useState({
		loaded: false,
		supportsBlend: false,
	})

	useEffect(() => {
		if (window.CSS && !state.loaded) {
			if (CSS.supports('mix-blend-mode', 'screen')) {
				wall.current.classList.add('supports-blend')
				changeState({
					loaded: true,
					supportsBlend: true,
				})
			}
		}
	}, [state.loaded])

	const spanAttrs: Partial<{ style: unknown }> = {}

	if (!twoColumnWall && data.titleImage) {
		spanAttrs.style = {
			backgroundImage: `url('${data.titleImage}')`,
		}
	}

	const innerComponents = (
		<React.Fragment>
			<div className="title bg-bg">
				<h1 className={`text-6xl relative lg:text-7xl ${data.capitalizeTitleOnHome ? 'uppercase' : ''}`}>
					<span {...spanAttrs}></span>
					{data.title}
				</h1>
			</div>
			<p className="text-lg lg:text-xl text-color-2 pt-4 lg:pt-0">{data.introTag}</p>
			<p className="text-base lg:text-lg mt-4">
				{data.description}
				<div>
					<TextLoop>
						{data.factories.map(fac => (
							<div className="flex items-center" key={fac.name}>
								<img className="w-20 h-20 rounded-full mr-4" src={fac.logo} alt="i" />
								<div className="text-md">
									<p className="text-black leading-none">{fac.name}</p>
									<p className="text-grey-dark">{fac.address}</p>
								</div>
							</div>
						))}
					</TextLoop>
				</div>
			</p>
			<ScrollIntoView selector="#portfolio">
				<Button title="SEE OUR FACTORIES" type="button" iconRight={<ArrowRight />} />
			</ScrollIntoView>
		</React.Fragment>
	)

	if (twoColumnWall) {
		return (
			<div className="wall h-screen flex relative justify-center items-center overflow-hidden" ref={wall}>
				<div className="flex-1 lg:block absolute lg:relative w-8/12 h-8/12 top-0 left-0">
					<div
						className="absolute left-0 top-0 w-full h-full lg:hidden"
						style={{
							background: 'rgba(0,0,0,.75)',
						}}
					></div>
					<SlideShow images={data.titleImages} />
				</div>
				<div className="flex-1 text-center p-3 relative z-10 lg:text-left lg:pl-8 text-white lg:text-color-default">
					{innerComponents}
				</div>
			</div>
		)
	}

	return (
		<div className="wall h-screen flex flex-col justify-center items-center text-center" ref={wall}>
			{innerComponents}
		</div>
	)
}

const SlideShow = ({ images }) => (
	<Carousel autoPlay={true} infiniteLoop={true} interval={2500}>
		{images.map((image, idx) => (
			<div key={idx}>
				<img src={image} className="h-full w-auto max-w-none lg:h-auto lg:w-full" />
			</div>
		))}
	</Carousel>
)

const About = ({ data, title }) => {
	return (
		<div className="boxed">
			<div className="px-4 py-20 text-center lg:py-20 lg:px-0">
				<h2 className="text-color-1 font-black text-5xl lg:text-6xl">{title}</h2>
				<p className="mt-5 text-lg">{data}</p>
			</div>
		</div>
	)
}

const Contact = ({ data }) => {
	const hasContactForm = data.api_url
	return (
		<div className="container mx-auto">
			<div className="pt-20 pb-10 lg:pt-40 lg:pb-20 text-center">
				<h2 className="text-color-1 font-black text-5xl lg:text-6xl">Contact</h2>
			</div>
			<div className="flex flex-wrap pb-40">
				{hasContactForm && (
					<div className="w-full lg:w-1/2 px-4 lg:pl-2 lg:pr-6">
						<Form api={data.api_url} />
					</div>
				)}
				<div className={`w-full ${hasContactForm ? 'lg:w-1/2' : 'lg:w-2/3 mx-auto'} px-6 pt-8`}>
					<ContactDescription data={data} />
				</div>
			</div>
		</div>
	)
}

export const query = graphql`
	query IndexPageQuery {
		site: site {
			siteMetadata {
				title
				description
				factories {
					name
					address
					logo
				}
				capitalizeTitleOnHome
				titleImages
				ogImage
				twoColumnWall
				introTag
				description
				mission
				vision
				contact {
					api_url
					description
					mail
					phone
					address
				}
				social {
					name
					url
					icon
				}
			}
		}
		portfolio: allMdx(filter: { fields: { sourceName: { eq: "portfolio" } } }, limit: 6) {
			edges {
				node {
					id
					frontmatter {
						title
						description
						image {
							childImageSharp {
								fluid(maxWidth: 1000) {
									...GatsbyImageSharpFluid
								}
							}
						}
					}
					fields {
						slug
					}
				}
			}
		}
	}
`

export default IndexPage
