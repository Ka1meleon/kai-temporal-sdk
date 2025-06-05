export interface IBaseRepository<TDto, TTableRow> {
  convertToDto(tableRow: TTableRow): TDto;
  convertToTableRow(dto: Partial<TDto>): Partial<TTableRow>;
}
