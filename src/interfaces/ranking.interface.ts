export interface RankinInterface {
    raceId: number
    raceFileName: string
    pilotsRanking: PilotRankinInterface[]
}
export interface PilotRankinInterface {
    pilotCode: number
    pilotName: string
    position: number
    totalLaps: number
    totalTime: number | string
}

// Posição Chegada, Código Piloto, Nome Piloto, Qtde Voltas Completadas e Tempo Total de Prova.
