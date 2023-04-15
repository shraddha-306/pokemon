import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
            integrity="sha384-U4mfw4Iz4gK+R3BvVJo/urBhZ7oiuNjPLXkk9VcZIcg20EmA1aiGTt8xI7VYkYf1"
            crossOrigin="anonymous"
          />
          <title>Pokedex</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
