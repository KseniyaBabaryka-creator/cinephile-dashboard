function Header( {title, description = null} ) {
	return(
		<header className="w-full flex flex-col gap-2 p-4 border-b border-solid">
			<h1 className="text-3xl font-medium">{title}</h1>
			{description && <p className="font-normal text-sm italic">{description}</p>}
		</header>
	)
}

export default Header;