import type { CollectionEntry } from 'astro:content'
import { getCollection } from 'astro:content'

export interface TagType {
  tag: string
  count: number
  // pages: CollectionEntry<'blog'>[]
}

export const SiteMetadata = {
  title: 'Chris Tham',
  description: 'artist, consultant, cyclist, designer, musician, photographer, world traveller',
  author: {
    name: 'Chris Tham',
    twitter: '@chris1tham',
    url: 'https://christham.net',
    email: 'chris@christham.net',
    summary: 'Outrageous actualiser.'
  },
  org: {
    name: 'Hello Tham',
    twitter: '@hellothamcom',
    url: 'https://hellotham.com',
    email: 'info@hellotham.com',
    summary:
      'Hello Tham is a boutique management consulting firm. We specialise in Business and IT strategies, operating models, strategic roadmaps, enterprise architecture, analytics and business process design.'
  },
  location: 'Sydney, Australia',
  latlng: [-33.86785, 151.20732] as [number, number],
  repository: 'https://github.com/ChristineTham/christham-astro',
  buildTime: new Date()
}

export const years = [
  2023, 2022, 2021, 2020, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2010, 2009, 2001
]

export { default as Logo } from './logo.svg'
export { default as LogoImage } from './logo.png'
export { default as defaultImage } from './my_feed.png'

export const NavigationLinks = [
  { name: 'Home', href: '' },
  { name: 'Biography', href: 'bio/introduction' },
  { name: 'Contact', href: 'contact' },
  { name: 'Blog', href: '2023' },
  { name: 'Websites', href: 'websites' }
]

export const PAGE_SIZE = 48

export const GITHUB_EDIT_URL = `https://github.com/ChristineTham/christinetham.github.io`

export const COMMUNITY_INVITE_URL = null // `https://astro.build/chat`

export type Sidebar = Record<string, { text: string; link: string }[]>

export async function getPosts(
  filter?: (post: Record<string, any>) => boolean
): Promise<CollectionEntry<'blog'>[]> {
  let posts = await getCollection('blog', ({ data }) => {
    return data.draft !== true
  })
  if (filter) {
    posts = posts.filter(filter)
  }
  return posts.sort((a, b) =>
    a.data.pubDate && b.data.pubDate ? +b.data.pubDate - +a.data.pubDate : 0
  )
}

export function getAllPosts() {
  let allposts = [] as CollectionEntry<'blog'>[]
  const postdict: Record<string, CollectionEntry<'blog'>[]> = import.meta.glob('../blog/*.json', {
    import: 'default',
    eager: true
  })
  for (const [file, posts] of Object.entries(postdict)) {
    const year = file.split('/').pop()?.split('.')[0]
    allposts = allposts.concat(
      posts.map((post) => {
        let newpost = post
        newpost.id = year + '/' + post.id
        newpost.data.pubDate = new Date(post.data.pubDate!)
        return newpost
      })
    )
  }
  allposts = allposts.sort((a, b) =>
    a.data.pubDate && b.data.pubDate ? +b.data.pubDate - +a.data.pubDate : 0
  )

  return allposts
}
