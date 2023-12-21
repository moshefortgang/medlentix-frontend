/* eslint-disable react/no-unescaped-entities */
export function ProjectComponent ({ data}: any){

  return (
		<div>
    <div className="p-2">
			{data.project[0]?.projectName}
    </div>    
		<div className="p-2">
			סה"כ נמכרו 
			{data.soldApartmentsCount}
			דירות מתוך
			{data.project[0]?.Kibolet}
    </div>
		</div>

  )
}

