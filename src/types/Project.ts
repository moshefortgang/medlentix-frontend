export type Michraz = {
  id:             number 
  MichrazID:      number
  MitchamName:    string
  SchumZchiya:    number
  ShemZoche:      string
  Kibolet:        number
  HotzaotPituach: number
  VaadaDate:      any | null
};

export type Project = {
  projectName: string
	shchuna: string | null
	Kibolet?: number
	id: any
	createdAt: any
	updatedAt: any
	michrazId: any
	city: any
	michraz?: Michraz | null
	VaadaDate: any | null
	totalCount?: number
};
