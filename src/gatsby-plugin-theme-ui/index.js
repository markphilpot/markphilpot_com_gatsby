const theme = {
  config: {
    initialColorModeName: 'light',
    useColorSchemeMediaQuery: 'system',
  },
  breakpoints: ['375px', '768px', '960px', '1920px'],
  fonts: {
    body:
      '"Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;',
    heading: '"Inter"',
    monospace: '"Source Code Pro", Monaco, Menlo, Consolas, "Courier New", monospace',
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
    display: 800,
  },
  lineHeights: {
    body: 1.6,
    heading: 1.25,
  },
  space: [0, 2, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 76, 96],
  fontSizes: [12, 13, 14, 16, 20, 24, 32, 36, 48, 64],
  colors: {
    text: '#000000',
    background: '#ECEFF4',
    accent: '#5f7782',
    muted: 'rgba(0, 0, 0, 0.6)',
    microBg: 'rgba(216,222,233,0.6)',
    dateHighlight: '#000000',
    link: '#5f7782',
    linkHover: '#546875',
    modes: {
      dark: {
        text: '#BEBEBE',
        background: '#100c11',
        accent: '#5f7782',
        muted: 'rgba(255, 255, 255, 0.6)',
        microBg: 'rgba(46,52,64,0.4)',
        dateHighlight: '#A4BCEC',
        link: '#5f7782',
        linkHover: '#546875',
      },
    },
  },
  shadows: {
    microBg: '0px 0px 8px 12px',
  },
  text: {
    caps: {
      textTransform: 'uppercase',
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
    h1: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 6,
    },
    h2: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 5,
    },
    h3: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 4,
    },
    h4: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 3,
    },
    h5: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 2,
    },
    h6: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 1,
    },
    p: {
      color: 'text',
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
      fontSize: 4,
    },
    a: {
      textDecoration: 'underline',
      textDecorationThickness: '1px',
      textDecorationColor: 'link',
      textUnderlineOffset: '1px',
      color: 'link',
      '&.active': {
        color: 'linkHover',
      },
      '&:hover': {
        color: 'linkHover',
      },
      transition: 'color 0.2s ease',
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit',
      },
      bg: 'microBg',
      padding: 6,
      borderRadius: 6,
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 3,
      bg: 'microBg',
      px: 2,
      borderRadius: 2,
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
      borderBottomWidth: 1,
      borderColor: 'accent',
    },
    img: {
      maxWidth: '100%',
    },
    navlink: {
      fontSize: 4,
      textDecoration: 'none',
      color: 'link',
      '&.active': {
        color: 'linkHover',
      },
      '&:hover': {
        color: 'linkHover',
      },
      transition: 'color 0.2s ease',
    },
    blockquote: {
      borderLeftWidth: 2,
      borderColor: 'accent',
      borderLeftStyle: 'solid',
      paddingLeft: 6,
    },
  },
};

export default theme;
