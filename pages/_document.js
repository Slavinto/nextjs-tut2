import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang='en'>
                <Head>
                    <link
                        rel='preload'
                        href='/fonts/DancingScript-Bold.ttf'
                        as='font'
                        crossOrigin='anonimous'
                    ></link>
                </Head>
                <body>
                    <Main></Main>

                    <NextScript></NextScript>
                </body>
            </Html>
        );
    }
}

// import Document, { Head, Html, Main, NextScript } from "next/document";

// class MyDocument extends Document {
//   render() {
//     return (
//       <Html lang="en">
//         <Head>
//           <link
//             rel="preload"
//             href="/fonts/IBMPlexSans-Bold.ttf"
//             as="font"
//             crossOrigin="anonymous"
//           ></link>
//           <link
//             rel="preload"
//             href="/fonts/IBMPlexSans-Regular.ttf"
//             as="font"
//             crossOrigin="anonymous"
//           ></link>
//           <link
//             rel="preload"
//             href="/fonts/IBMPlexSans-SemiBold.ttf"
//             as="font"
//             crossOrigin="anonymous"
//           ></link>
//         </Head>
//         <body>
//           <Main></Main>
//           <NextScript />
//         </body>
//       </Html>
//     );
//   }
// }

// export default MyDocument;
