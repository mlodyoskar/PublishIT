import React from 'react';
import { BsFillLightningChargeFill } from 'react-icons/bs';
import { MdArticle, MdCreate, MdReviews } from 'react-icons/md';
import Logo from 'assets/img/articles.svg';

type LoginSignUpProps = {
	children: React.ReactNode;
};

const LoginSignupTemplate = ({ children }: LoginSignUpProps) => {
	return (
		<div className="flex h-screen">
			<div className="m-auto flex h-full w-full max-w-3xl flex-col items-center justify-center p-6 md:w-2/4">
				<div className=" mb-6 flex w-full items-center justify-start md:w-4/5 ">
					<BsFillLightningChargeFill size="3rem" className="mr-2 text-indigo-500" />
					<p className="text-3xl text-indigo-500">PublishIT</p>
				</div>
				<div className=" flex h-4/5 w-full flex-col items-center justify-center md:w-4/5">
					{children}
				</div>
			</div>
			<div className="hidden w-2/4 items-center justify-center bg-indigo-500 md:flex">
				<div className=" relative flex h-4/5 w-4/5 flex-col items-center justify-around">
					<img src={Logo} className="w-2/4" />
					<div>
						<h1 className="mb-2 text-center text-4xl text-gray-50">
							Read, review and create articles about things that interests you!
						</h1>
						<p className="text-center text-gray-200">Everything for free!</p>
					</div>
					<span className="bottom-3/5 absolute right-12 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
						<MdArticle size="3rem" className="text-indigo-600" />
					</span>
					<span className="absolute top-1/3 left-0 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
						<MdReviews size="3rem" className="text-indigo-600" />
					</span>
					<div className="absolute top-0  right-0 flex h-20 w-20 items-center justify-center">
						<span className="absolute h-20 w-20  rounded-full bg-gray-100"></span>
						<MdCreate size="3rem" className="absolute text-indigo-600" />
					</div>
				</div>
			</div>
		</div>
	);
};

export { LoginSignupTemplate };
