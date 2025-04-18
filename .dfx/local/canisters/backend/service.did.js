export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'Ok' : IDL.Text, 'Err' : IDL.Text });
  const OnThisDay = IDL.Record({
    'title' : IDL.Text,
    'year' : IDL.Text,
    'wiki_link' : IDL.Text,
  });
  const Note = IDL.Record({
    'id' : IDL.Nat,
    'content' : IDL.Text,
    'is_completed' : IDL.Bool,
  });
  const DayDataEntry = IDL.Record({
    'on_this_day' : IDL.Opt(OnThisDay),
    'notes' : IDL.Vec(Note),
  });
  const HttpHeader = IDL.Record({ 'value' : IDL.Text, 'name' : IDL.Text });
  const HttpResponse = IDL.Record({
    'status' : IDL.Nat,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HttpHeader),
  });
  const TransformArgs = IDL.Record({
    'context' : IDL.Vec(IDL.Nat8),
    'response' : HttpResponse,
  });
  return IDL.Service({
    'add_note' : IDL.Func([IDL.Text, IDL.Text], [Result], []),
    'complete_note' : IDL.Func([IDL.Text, IDL.Nat], [], []),
    'fetch_and_store_on_this_day' : IDL.Func([IDL.Text], [Result], []),
    'get_day_data' : IDL.Func([IDL.Text], [IDL.Opt(DayDataEntry)], ['query']),
    'get_month_data' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [IDL.Vec(IDL.Tuple(IDL.Text, DayDataEntry))],
        ['query'],
      ),
    'transform' : IDL.Func([TransformArgs], [HttpResponse], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
