export type PlayerId = string;

export type PlayerStatus = {
  id: PlayerId;
  progress: number;
  lastScore: number;
  maxScore: number;
  name: string;
  // среднее значение за всю игру
  avg: number;
  // среднее значение за партию
  legAvg: number;
  // количество выигранных сетов
  setsWin: number;
  // количество выигранных партий
  legsWin: number;
  reserve: Omit<PlayerStatus, 'id' | 'reserve'> | null;
};
