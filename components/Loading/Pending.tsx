import { Modal } from 'antd';
import lottie, { AnimationItem } from 'lottie-web';
import React from 'react';

type Status = 'success' | 'fail' | 'pending';

type Props = {
  visible: boolean;
  status?: Status;
  onCacel(): void;
};

const Pending: React.FunctionComponent<Props> = ({ children, visible, status, onCacel }) => {
  const animationRef = React.useRef<Promise<AnimationItem>>();
  const lastStatus = React.useRef<Status>();

  React.useEffect(() => {
    lastStatus.current = status;
  }, [status]);

  const playLoading = async (force = false) => {
    (await animationRef.current)?.playSegments?.([119, 238], force);
  };

  const playSuccess = async (force = false) => {
    (await animationRef.current)?.playSegments?.([238, 400], force);
  };

  const playFail = async (force = false) => {
    (await animationRef.current)?.playSegments?.([657, 826], force);
  };

  React.useEffect(() => {
    const element = document.getElementById('animation-pending-container');

    if (!element) {
      return;
    }

    if (!visible) {
      (async () => {
        (await animationRef.current)?.destroy();
        animationRef.current = null as any;
      })();

      return;
    }

    const animation = lottie.loadAnimation({
      container: element,
      renderer: 'svg',
      name: 'aaa',
      loop: false,
      autoplay: false,
      path: '/animation.json' // the path to the animation json
    });

    animationRef.current = new Promise<AnimationItem>((resolve) => {
      const func = () => {
        resolve(animation);
        animation.removeEventListener('DOMLoaded', func);
      };

      animation.addEventListener('DOMLoaded', func);
    });
  }, [visible]);

  React.useEffect(() => {
    let interval: any = null;

    if (status === 'pending') {
      interval = setInterval(() => {
        playLoading(false);
      }, (238 - 119) * (1 / 60) * 1000);
      playLoading(true);
    }

    if (status === 'success') {
      clearInterval(interval);
      playSuccess(!!lastStatus.current || lastStatus.current !== status);
    }

    if (status === 'fail') {
      clearInterval(interval);
      playFail(!!lastStatus.current || lastStatus.current !== status);
    }

    return () => clearTimeout(interval);
  }, [status]);

  return (
    <Modal
      centered
      footer={null}
      mask
      maskClosable
      onCancel={onCacel}
      visible={visible}
      width={300}
    >
      <div id="animation-pending-container" style={{ width: 80, margin: '0 auto' }}></div>
      {children}
    </Modal>
  );
};

export default Pending;
