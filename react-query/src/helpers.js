// Задизэйблены кнопки редактирования и удаления дефолтных айтемов, так как API не позволяет проводить операции с ними. Редактировать и удалять можно только вновь созданные сущности

export const isDisabled = (id) => Number(id) <= 13 && Number(id) >=1