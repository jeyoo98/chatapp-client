import React from "react";

import Navbar from "@components/Navbar/Navbar";
import ProfileData from "@/types/ProfileData";
import { getUid, storeProfile } from "@/utils/credentialManager";

interface ProfileComponentProps {
	profileData?: ProfileData
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({
	profileData
}) => {
	const isCurrentUser = profileData?.uid === getUid()

	//  Re-cache any new data
	if (isCurrentUser) {
		storeProfile(profileData)
	}

	return (
		<main className="bg-gray-300">
			<Navbar />
			<section className="overflow-y-scroll">
				<div className="flex flex-col w-168 mx-auto bg-white">
					<h2 className="text-center py-3 text-2xl font-bold shadow-md bg-white z-10">{profileData?.username}</h2>

					<div className="flex flex-col grow p-4 bg-white">
						<div className="flex bg-white">
							<div className="flex flex-col border-b border-gray-300">

								<div className="flex flex-col">
									<img className="rounded-3xl w-64 aspect-square" src={profileData?.pfp_url} alt="Profile"></img>
									{
										/**
										 * Show either an `Add Friend` or `Change Picture` button, depending if we are viewing our own profile
										 * or another User's profile.
										 */
										isCurrentUser 
										? <button className="bg-blue-600 my-3 p-1 rounded-lg text-white">Change picture</button>
										: <button className="bg-theme-darkgreen my-3 p-1 rounded-lg text-white">Add Friend</button>
									}
								</div>
							</div>
							<div className="flex flex-col pl-4 grow basis-0 border-b border-gray-300">
								<div className="flex flex-row border-b border-gray-300">
									<h3 className="w-full">About Me</h3>
									{isCurrentUser && <button className="text-theme-darkgreen">Edit</button>}
								</div>
								<p className="h-full pt-2">{profileData?.about}</p>
							</div>
						</div>


						<div className='pt-4 bg-white'>
							<h3>Friends list</h3>
							<ul>
								<li>Friend 1</li>
								<li>Friend 2</li>
								<li>Friend 3</li>
							</ul>
						</div>
					</div>

				</div>

			</section>
		</main>
	)
}

export default ProfileComponent
