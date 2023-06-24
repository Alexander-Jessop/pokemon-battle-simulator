export interface IPokeSpec {
  name: string;
  url: string;
}

export interface ISelectPoke {
  id: number;
  name: string;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
}
