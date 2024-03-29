const siteMetadata = {
	title: 'Sadia Group of Industries',
	siteUrl: 'https://www.sadiatextile.com',
	capitalizeTitleOnHome: false,
	logo: '/images/logos/sadia.png',
	icon: '/images/logos/sadia.png',
	titleImages: [
		'/images/slides/DSC_0033-min.JPG',
		'/images/slides/DSC_0107-min.JPG',
		'/images/slides/DSC_0140-min.JPG',
		'/images/slides/DSC_0166-min.JPG',
		'/images/slides/DSC_0174-min.JPG',
		'/images/slides/DSC_0186-min.JPG',
		'/images/slides/DSC_0222-min.JPG',
		'/images/slides/IMG20210224170258-min.jpg',
		'/images/slides/IMG20210224170539-min.jpg',
		'/images/slides/IMG20210224170620-min.jpg',
		'/images/slides/IMG20210224170745-min.jpg',
		'/images/slides/IMG20210224171108-min.jpg',
	],
	ogImage: '/images/slides/IMG20210224170745-min.jpg',
	twoColumnWall: true,
	cookiePolicy: true,
	introTag: '100% Export oriented fabric manufacturer & exporter',
	description:
		'We are a 100% export oriented group of companies focused on delivering best quality woven fabric at the best market price. We work hard to deliver products according to our client\'s demands. We started our journey in 2001 and have grown steadily ever since. Sadia group now offers a wide range of non-denim woven fabrics. Our companies are:',
	factories: [
		{
			name: 'Sadia Textile Mills Limited',
			address: 'Kadimdhalla, Baniara, Mirzapur, Tangail',
			logo: '/images/logos/sadia.png',
		},
		{
			name: 'Parisha Textile Mills Limited',
			address: 'Kadimdhalla, Baniara, Mirzapur, Tangail',
			logo: '/images/logos/parisha.png',
		},
		{
			name: 'Aqib Textile Mills',
			address: 'Beron, Ashulia, Dhaka',
			logo: '/images/logos/aqib.png',
		},
		{
			name: 'Apan Textile Mills',
			address: 'Chitrashail, Ashulia, Dhaka',
			logo: '/images/logos/apan.png',
		},
	],
	about: `
			Sadia Group of Industries is one of the leading manufacturers & exporters of fabrics in Bangladesh. We are interested to provide the best quality of fabrics with affordable price to our buyers, including international buying houses, buyer offices, liaison offices, garments, and related companies.

			We started our journey in January 2001 and have grown steadily ever since. Sadia Group of Industries now offers the complete range of trim fabrics. We have always produced and supplied the highest international standards in quality of fabrics. As regards to environmental, health & safety management, we provide customers AZO, APEO, Formaldehyde, pH & others hazardous chemical free fabrics in local and international markets.

			Sadia Group of Industries is committed to face the global challenge and to that end in view BMRE is almost a continual phenomenon. As per the requirements and constraints of H&M, we regularly execute speed orders and super-speed orders gracefully. We keep a stock of 40 lac yards of different types of gray fabric and 3 lac yards of dying-processed fabric for these quick-delivery purpose.

			We are looking forward to hearing your favorable response. In the meantime, if you need any more information, please feel free contact with us.
		`,
	mission:
		'Our mission is to deliver our clients the finest quality product while maintaining all the international standards required by them.',
	vision:
		'Our vision is to provide a holistic support to our clients’ needs while maintaining environment friendly business at all times. ',
	author: '@maacpiash',
	portfolioItemsPerPage: 10,
	darkmode: false,
	switchTheme: true,
	navLinks: [
		{
			name: 'HOME',
			url: '/',
		},
		{
			name: 'ABOUT US',
			url: '/about',
		},
		{
			name: 'OUR BUSINESSES',
			url: '/portfolio',
		},
		{
			name: 'OUR PRODUCTS',
			url: '/products',
		},
		{
			name: 'COMPLIANCES',
			url: '/compliances',
		},
	],
	footerLinks: [
		{
			name: 'PRIVACY POLICY',
			url: '/privacy-policy',
		},
		{
			name: 'WEBSITE SOURCE',
			url: 'https://github.com/sadiatextile/website',
		},
	],
	social: [
		{
			name: 'Facebook',
			icon: '/images/Facebook.svg',
			url: 'https://www.facebook.com/sadiagroupofindustries',
		},
		{
			name: 'LinkedIn',
			icon: '/images/LinkedIn.svg',
			url: '#',
		},
	],
	contact: {
		// leave empty ('') or false to hide form
		api_url: 'https://getform.io/f/65608587-3d12-4d4c-9273-d27a8f5720f9',
		description: 'If you have a question or comment, feel free to leave here!',
		mail: 'info@sadiatextile.com',
		phone: '+8801711856850, +8801714100878',
		address: 'House 6, Road 13, Sector 7, Uttara, Dhaka 1230, Bangladesh',
	},
	disqus: 'elemental-netlify-com',
}

const beforeContactFormSubmit = data => {
	// Code 0 - success
	// Code 1 - Name
	// Code 2 - Email
	// Code 3 - Message
	// Code 4 - Other
	const errors = []

	if (data.name.trim().length < 2) {
		errors.push({
			code: 1,
			message: 'Enter a name',
		})
	}

	if (!data.email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
		errors.push({
			code: 2,
			message: 'Enter a valid email address',
		})
	}

	if (data.message.trim().length < 15) {
		errors.push({
			code: 3,
			message: 'Enter a message with atleast 15 characters',
		})
	}

	if (errors.length > 0)
		return {
			result: false,
			errors: errors,
		}

	return {
		data: {
			name: data.name,
			email: data.email,
			message: data.message,
		},
		result: true,
	}
}

const defaults = {
	disqus: null,
	twoColumnWall: true,
	darkmode: false,
	switchTheme: true,
	capitalizeTitleOnHome: true,
	cookiePolicy: false,
}

Object.keys(defaults).forEach(item => {
	if (siteMetadata[item] === undefined) {
		siteMetadata[item] = defaults[item]
	}
})

export { siteMetadata, beforeContactFormSubmit }
