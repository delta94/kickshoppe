interface StockLoginXProps {
  user: string;
  password: string;
}
class StockXConstructor {
  constructor(...args: any) {}
  login: (props: StockLoginXProps) => void;
}
