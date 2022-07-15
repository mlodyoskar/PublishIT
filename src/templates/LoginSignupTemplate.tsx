import React from 'react';
import { BsFillLightningChargeFill } from 'react-icons/bs';
import { MdArticle, MdCreate, MdReviews } from 'react-icons/md';
import Logo from 'assets/img/articles.svg';

type LoginSignUpProps = {
	children: React.ReactNode;
};

const LoginSignupTemplate = ({ children }: LoginSignUpProps) => {
	return (
		<div className="h-screen flex">
			<div className="flex flex-col justify-center items-center w-full md:w-2/4 p-6 m-auto h-full max-w-3xl">
				<div className=" mb-6 flex justify-start items-center w-full md:w-4/5 ">
					<BsFillLightningChargeFill size="3rem" className="text-indigo-500 mr-2" />
					<p className="text-3xl text-indigo-500">PublishIT</p>
				</div>
				<div className=" flex flex-col items-center justify-center w-full md:w-4/5 h-4/5">
					{children}
				</div>
			</div>
			<div className="w-2/4 bg-indigo-500 md:flex justify-center items-center hidden">
				<div className=" flex relative flex-col items-center justify-around w-4/5 h-4/5">
					<img src={Logo} className="w-2/4" />
					<div>
						<h1 className="text-4xl text-gray-50 text-center mb-2">
							Read, review and create articles about things that interests you!
						</h1>
						<p className="text-gray-200 text-center">Everything for free!</p>
					</div>
					<span className="w-20 h-20 rounded-full bottom-3/5 right-12 absolute bg-gray-100 flex items-center justify-center">
						<MdArticle size="3rem" className="text-indigo-600" />
					</span>
					<span className="w-20 h-20 rounded-full top-1/3 left-0 absolute bg-gray-100 flex items-center justify-center">
						<MdReviews size="3rem" className="text-indigo-600" />
					</span>
					<div className="w-20 h-20  top-0 right-0 absolute flex items-center justify-center">
						<span className="w-20 h-20 bg-gray-100  absolute rounded-full"></span>
						<MdCreate size="3rem" className="text-indigo-600 absolute" />
					</div>
				</div>
			</div>
		</div>
	);
};

export { LoginSignupTemplate };
