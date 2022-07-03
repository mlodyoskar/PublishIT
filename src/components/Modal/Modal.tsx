import { ReactNode, useRef } from 'react';
import ReactDOM from 'react-dom';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useOnClickOutside } from 'hooks/useClickOutside';

type ModalProps = {
  isOpen: boolean;
  handler: () => void;
  headerText: ReactNode;
  children: ReactNode;
};

const Modal = ({ isOpen, handler, headerText, children }: ModalProps) => {
  const portal = document.getElementById('portal');
  const modalRef = useRef(null);

  useOnClickOutside(modalRef, handler);
  return (
    portal &&
    ReactDOM.createPortal(
      isOpen && (
        <>
          <div className="fixed w-full h-full bg-black z-0 opacity-30 top-0"></div>
          <div className="flex items-center justify-center fixed w-full h-full top-0">
            <div
              ref={modalRef}
              className="flex flex-col h-1/2 w-1/2 z-10 bg-white rounded-md shadow-md"
            >
              <div className="flex items-center max-h-16 w-full justify-between p-4">
                <p className="text-2xl text-black ">{headerText}</p>
                <div onClick={handler} className="h-full cursor-pointer">
                  <AiFillCloseCircle
                    className="text-indigo-400 hover:text-indigo-700 transition-colors"
                    size="2rem"
                  />
                </div>
              </div>
              <div className="p-4">{children}</div>
            </div>
          </div>
        </>
      ),
      portal
    )
  );
};

export { Modal };
