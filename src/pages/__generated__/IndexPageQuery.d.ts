/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IndexPageQuery
// ====================================================

export interface IndexPageQuery_site_siteMetadata_factories {
  name: string | null;
  address: string | null;
  logo: string | null;
}

export interface IndexPageQuery_site_siteMetadata_contact {
  api_url: string | null;
  description: string | null;
  mail: string | null;
  phone: string | null;
  address: string | null;
}

export interface IndexPageQuery_site_siteMetadata_social {
  name: string | null;
  url: string | null;
  icon: string | null;
}

export interface IndexPageQuery_site_siteMetadata {
  title: string | null;
  description: string | null;
  factories: (IndexPageQuery_site_siteMetadata_factories | null)[] | null;
  capitalizeTitleOnHome: boolean | null;
  titleImages: (string | null)[] | null;
  ogImage: string | null;
  twoColumnWall: boolean | null;
  introTag: string | null;
  mission: string | null;
  vision: string | null;
  contact: IndexPageQuery_site_siteMetadata_contact | null;
  social: (IndexPageQuery_site_siteMetadata_social | null)[] | null;
}

export interface IndexPageQuery_site {
  siteMetadata: IndexPageQuery_site_siteMetadata | null;
}

export interface IndexPageQuery_portfolio_edges_node_frontmatter_image_childImageSharp_fluid {
  base64: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  sizes: string;
}

export interface IndexPageQuery_portfolio_edges_node_frontmatter_image_childImageSharp {
  fluid: IndexPageQuery_portfolio_edges_node_frontmatter_image_childImageSharp_fluid | null;
}

export interface IndexPageQuery_portfolio_edges_node_frontmatter_image {
  /**
   * Returns the first child node of type ImageSharp or null if there are no children of given type on this node
   */
  childImageSharp: IndexPageQuery_portfolio_edges_node_frontmatter_image_childImageSharp | null;
}

export interface IndexPageQuery_portfolio_edges_node_frontmatter {
  title: string;
  description: string | null;
  image: IndexPageQuery_portfolio_edges_node_frontmatter_image | null;
}

export interface IndexPageQuery_portfolio_edges_node_fields {
  slug: string | null;
}

export interface IndexPageQuery_portfolio_edges_node {
  id: string;
  frontmatter: IndexPageQuery_portfolio_edges_node_frontmatter | null;
  fields: IndexPageQuery_portfolio_edges_node_fields | null;
}

export interface IndexPageQuery_portfolio_edges {
  node: IndexPageQuery_portfolio_edges_node;
}

export interface IndexPageQuery_portfolio {
  edges: IndexPageQuery_portfolio_edges[];
}

export interface IndexPageQuery {
  site: IndexPageQuery_site | null;
  portfolio: IndexPageQuery_portfolio;
}
