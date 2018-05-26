insert into
	link (
		title,
		way, 
		person_id, 
		preview, 
		image_url
	)
values (
	${title}::text, 
	${way}::text,
	${person_id}::integer, 
	${preview}::text, 
	${image_url}::text
) RETURNING *