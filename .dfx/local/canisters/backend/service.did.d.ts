import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface DayDataEntry {
  'on_this_day' : [] | [OnThisDay],
  'notes' : Array<Note>,
}
export interface HttpHeader { 'value' : string, 'name' : string }
export interface HttpResponse {
  'status' : bigint,
  'body' : Uint8Array | number[],
  'headers' : Array<HttpHeader>,
}
export interface Note {
  'id' : bigint,
  'content' : string,
  'is_completed' : boolean,
}
export interface OnThisDay {
  'title' : string,
  'year' : string,
  'wiki_link' : string,
}
export type Result = { 'Ok' : string } |
  { 'Err' : string };
export interface TransformArgs {
  'context' : Uint8Array | number[],
  'response' : HttpResponse,
}
export interface _SERVICE {
  'add_note' : ActorMethod<[string, string], Result>,
  'complete_note' : ActorMethod<[string, bigint], undefined>,
  'fetch_and_store_on_this_day' : ActorMethod<[string], Result>,
  'get_day_data' : ActorMethod<[string], [] | [DayDataEntry]>,
  'get_month_data' : ActorMethod<
    [bigint, bigint],
    Array<[string, DayDataEntry]>
  >,
  'transform' : ActorMethod<[TransformArgs], HttpResponse>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
