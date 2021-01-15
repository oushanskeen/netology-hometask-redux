import * as msg from "../messages/messages";

export const saveRecord = (_data) => {
  console.log("SAVE RECORD TRIGGERED");
  return {type:msg.SAVE_RECORD,payload:_data}
};
export const deleteRecord = (_data) => ({type:msg.DELETE_RECORD, payload:_data});
