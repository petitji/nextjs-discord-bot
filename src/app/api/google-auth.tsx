// 위에서 다운로드 받은 json 파일을 import 한다 (저는 이름을 변경했습니다.)
import { client_email, private_key } from '../../credentials.json';
import { google } from 'googleapis';

export async function getSheets(sheetId: string) {
  // json 파일을 가지고 인증할 때 다음과 같이 사용합니다.
  // scope는 spread sheet만 주었습니다.
  const authorize = new google.auth.JWT(client_email, '', private_key, [
    'https://www.googleapis.com/auth/spreadsheets',
  ]);
  // google spread sheet api 가져오기
  const googleSheet = google.sheets({
    version: 'v4',
    auth: authorize,
  });

  // 실제 스프레드시트 내용 가져오기
  const context = await googleSheet.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: 'basic',
  });

  console.log('context', context.data.values)
}
