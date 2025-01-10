'use client';

import Script from 'next/script';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'my-widget': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { project?: string },
        HTMLElement
      >;
    }
  }
}

const MyWidget = () => {
  return (
    <div>
      <Script
        src="https://opinio-widget.pages.dev/widget.umd.js"
        strategy="afterInteractive" 
        onLoad={() => {
          console.log('Widget script loaded');
        }}
      />
      <my-widget project-id="5"></my-widget>
    </div>
  );
};

export default MyWidget;