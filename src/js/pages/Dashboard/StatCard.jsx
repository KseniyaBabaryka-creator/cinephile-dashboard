function StatCard({title, text}) {
	return(
		<div className="card flex flex-col flex-1 gap-2 p-4 items-start rounded-xl">
			<p className="card__title text-sm font-medium">{title}</p>
			<p className="card__text text-3xl font-medium">{text}</p>
		</div>
	)
}

export default StatCard;