import {Link, useLocation, useNavigate} from "react-router-dom";
import useFilmStore from "./store/useFilmStore.js";

function Header() {
	const location = useLocation();
	const navigate = useNavigate();
	const films = useFilmStore((state) => state.films);

	return(
		<header className="w-full flex flex-col gap-6 p-4">
			<div className="header__top flex flex-col gap-2 border-b border-solid pb-4 items-start">
				<h1 className="text-3xl font-medium">
					{location.pathname === "/filmlist" ? "Films" : "Cinéphile Dashboard"}
				</h1>
				{location.pathname === "/"  && <p className="font-normal text-sm italic">A reflection of your cinematic journey</p>}
				{location.pathname !== "/" &&
					<button onClick={() => navigate(-1)} className="header__link-back text-sm font-medium cursor-pointer">Back</button>
				}
			</div>
			{(location.pathname === "/" || location.pathname === "/filmlist") &&
				<div className="flex flex-wrap items-center gap-8">
					<Link to="/add" className={`new-film__link flex items-center gap-4 ${(films.length === 0 && location.pathname === "/filmlist") && 'new-film__link-brighten'}`}>
						<button className="new-film__btn  text-center w-[40px] h-[40px] rounded-lg text-3xl">+</button>
						<span className="new-film__text text-base font-normal">New Film</span>
					</Link>
					{location.pathname === "/" &&
						<Link to="/filmlist" className="new-film__link flex items-center gap-4">
							<button className="new-film__btn  text-center w-[40px] h-[40px] rounded-lg text-3xl flex items-center justify-center">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
									 stroke-width="1.5" stroke="currentColor" className="size-6">
									<path stroke-linecap="round" stroke-linejoin="round"
										  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/>
								</svg>
							</button>
							<span className="new-film__text text-base font-normal">Film's List</span>
						</Link>
					}
				</div>
			}
		</header>
	)
}

export default Header;