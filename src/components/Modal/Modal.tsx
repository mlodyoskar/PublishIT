import { ReactNode, useRef } from 'react';
import ReactDOM from 'react-dom';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useOnClickOutside } from 'hooks/useClickOutside';

type ModalProps = {
	isOpen: boolean;
	handler: () => void;
	modalHeading: ReactNode;
	children: ReactNode;
};

const Modal = ({ isOpen, handler, modalHeading, children }: ModalProps) => {
	const portal = document.getElementById('portal');
	const modalRef = useRef<HTMLDivElement>(null);

	useOnClickOutside(modalRef, handler);
	return (
		portal &&
		ReactDOM.createPortal(
			isOpen && (
				<>
					<div className="fixed top-0 z-0 h-full w-full bg-black opacity-40"></div>
					<div className="fixed top-0 flex h-full w-full items-center justify-center">
						<div
							ref={modalRef}
							className="max-h-1/2 z-10 flex w-1/2 flex-col rounded-lg bg-white"
						>
							<div className="flex max-h-16 w-full items-center justify-between p-4">
								<p className="text-2xl text-black ">{modalHeading}</p>
								<div onClick={handler} className="h-full cursor-pointer">
									<AiFillCloseCircle
										className="text-indigo-600 transition-colors hover:text-indigo-700"
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
