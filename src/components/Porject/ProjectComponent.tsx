/* eslint-disable react/no-unescaped-entities */
export function ProjectComponent({ data }: any) {

	return (
<div className="flex justify-center items-center flex-col">
    <div className="p-2 text-xl font-bold "> 
        {data.project[0]?.projectName}
    </div>
    <div className="p-2 text-xl">
        סה"כ נמכרו {' '}
        {data.soldApartmentsCount} דירות מתוך {' '}
        {data.project[0]?.Kibolet}
    </div>
</div>
	)
}

