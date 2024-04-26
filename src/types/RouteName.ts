import { routes } from '@/router';

type RouteEntry = (typeof routes)[number];

type ExtractRouteName<T> = T extends { name: infer N }
  ? N | (T extends { children: Readonly<Array<infer C>> } ? ExtractRouteName<C> : never)
  : T extends { children: Readonly<Array<infer CC>> }
  ? ExtractRouteName<CC>
  : never;

export type RouteName = ExtractRouteName<RouteEntry>;
// export type RouteName = string;
