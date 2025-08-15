// import { WPOfficialService } from '@/infra/services/whatsapp/official/wp-official-service';

// export class OfficialDownloadMedia extends WPOfficialService {
//   public async execute(mediaId: number): Promise<Buffer> {
//     const response = await fetch(this.baseUri + `/${mediaId}`, {
//       headers: {
//         'Authorization': 'Bearer ' + this.accessToken.value,
//       },
//     });

//     const arrayBuffer = await response.arrayBuffer();
//     return Buffer.from(arrayBuffer);
//   }
// }