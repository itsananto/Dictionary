
interface Words{
  Descr: string;
  Details: Array<Details>;
}

interface Details {
  POS: string;
  Definition: string;
  Examples: Array<Examples>;
}

interface Examples {
  Descr: string;
}
