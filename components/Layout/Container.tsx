import React from 'react';

import useStyle from '@/shared/hooks/useStyle';

const Container: React.FunctionComponent<{ style?: React.CSSProperties; className?: string }> = ({
  children,
  style: styleProps,
  className
}) => {
  const style = useStyle();

  return (
    <>
      <div className={className} style={styleProps}>
        {children}
      </div>

      <style jsx>{`
        @media screen and (max-width: ${style.xxl.endpoint}px) {
          div {
            width: ${style.xxl.containerWidth};
          }
        }
      `}</style>
      <style jsx>{`
        @media screen and (max-width: ${style.xl.endpoint}px) {
          div {
            width: ${style.xl.containerWidth};
          }
        }
      `}</style>
      <style jsx>{`
        @media screen and (max-width: ${style.lg.endpoint}px) {
          div {
            width: ${style.lg.containerWidth};
          }
        }
      `}</style>
      <style jsx>{`
        @media screen and (max-width: ${style.md.endpoint}px) {
          div {
            width: ${style.md.containerWidth};
          }
        }
      `}</style>
      <style jsx>{`
        @media screen and (max-width: ${style.sm.endpoint}px) {
          div {
            width: ${style.sm.containerWidth};
          }
        }
      `}</style>
      <style jsx>{`
        @media screen and (max-width: ${style.xs.endpoint}px) {
          div {
            width: ${style.xs.containerWidth};
          }
        }
      `}</style>
    </>
  );
};

export default Container;
