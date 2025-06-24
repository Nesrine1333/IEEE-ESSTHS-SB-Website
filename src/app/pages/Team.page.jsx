import React from "react";
import ExCom from "../components/ExCom";
import Chairs from "../components/Chairs";


export default function TeamPage() {
	return (
		<div className="py-10 md:py-20">
			<div className="mb-12">
				<ExCom />
			</div>
			<div className="mb-12">
				<Chairs />
			</div>
			{/* <div className="mb-12">
			</div>
			<div className="mb-12">
			</div>
			<div className="mb-12">
				<MultimediaDepartment />
			</div> */}
		</div>
	);
}
