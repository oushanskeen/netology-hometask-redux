import * as msg from "../messages/messages";

export const saveInput = (_data) => ({msg:msg.SAVE_INPUT, payload:_data});
export const editRecord = (_data) => ({msg:msg.EDIT_RECORD, payload:_data});
export const cancelInput = (_data) => ({msg:msg.CANCEL_INPUT, payload:_data});
