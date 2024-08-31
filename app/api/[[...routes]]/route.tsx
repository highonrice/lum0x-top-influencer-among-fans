/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { getTopInfluencerOfMyFans, TopInfluencer, getUsersFromFids } from '../utils/lum0x-helpers'
import path from 'path';
import fs from 'fs/promises';
import { getShareImage } from '@/app/ui/findPage'

async function getRegularFontData() {
  const fontPath = path.resolve('./public/fonts/Coinbase_Display-Regular-web-1.32.ttf');
  const fontData = await fs.readFile(fontPath);
  return fontData;
}

async function getBoldFontData() {
  const fontPath = path.resolve('./public/fonts/Coinbase_Display-Bold-web-1.32.ttf');
  const fontData = await fs.readFile(fontPath);
  return fontData;
}

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  title: 'Top Influencer among Fans',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
  imageAspectRatio: '1:1',
  imageOptions: {
    height: 1000,
    width: 1000,
    fonts: [
      {
        name: 'coinbase',
        data: await getRegularFontData(),
        style: 'normal',
        weight: 400,
      },
      {
        name: 'coinbase',
        data: await getBoldFontData(),
        style: 'normal',
        weight: 700,
      },
    ]
  },
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/', (c) => {
  const shareUrl = `${process.env.BASE_URL}/share-default`

  return c.res({
    image: (
      '/Default.png'
    ),
    intents: [
      <Button action="/find">Find Now!</Button>,
      <Button.Link href={shareUrl}>Share</Button.Link>,
    ],
  })
})

app.frame('/find', async (c) => {
  const fid = c.frameData?.fid;
  if (!fid) {
    return c.error({message: 'No fid provided'});
  }

  // TODO: change this to the real fid
  const user = await getUsersFromFids([fid]);
  const displayName = user[0].display_name;
  // TODO: change this to the real fid
  const topInfluncer: TopInfluencer = await getTopInfluencerOfMyFans(217355);
  console.log(topInfluncer);

  return c.res({
    image: (
      getShareImage(displayName, topInfluncer)
    ),
    intents: [
      <Button action="/find">Check Me</Button>,
      <Button.Link href={`/share/${fid}`}>Share</Button.Link>,
    ],
  })
})

app.frame('/share-default', (c) => {
  return c.res({
    image: (
      '/Default.jpg'
    ),
    intents: [
      <Button action="/find">Find Now!</Button>,
      <Button action="/share-default">Share</Button>,
    ],
  })
})

app.frame('/share/:fid', async (c) => {
  const fid = c.req.param('fid');
  if (!fid) {
    return c.error({message: 'No fid provided'});
  }
  const user = await getUsersFromFids([Number(fid)]);
  const displayName = user[0].display_name;
  const topInfluncer: TopInfluencer = await getTopInfluencerOfMyFans(Number(fid));
  console.log(topInfluncer);

  return c.res({
    image: (
      getShareImage(displayName, topInfluncer)
    ),
    intents: [
      <Button action="/find">Check Me</Button>,
      <Button action="/share">Share</Button>,
    ],
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
