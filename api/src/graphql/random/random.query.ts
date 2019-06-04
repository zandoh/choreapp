interface IRandomList {
  list: number[];
  length: number;
  sum: number;
}

export const Query = {
  getRandomList: (root: any, args: { length: number }): IRandomList => {
    const dataList: number[] = [];
    for (let i = 0; i < args.length; i++) {
      dataList.push(parseInt((Math.random() * 100).toString()));
    }

    return {
      list: dataList,
      length: args.length,
      sum: dataList.reduce((a: number, b: number) => a + b, 0)
    };
  }
};
