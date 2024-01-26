import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs";
import { plainToClass } from "class-transformer";

export function Serialize(dto: any) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
// export class SerializeInterceptor implements NestInterceptor {
//     intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
//         // run somethig before a request is handled
//         console.log("Im running before the handler",context);
//         return next.handle().pipe(
//             map((data: any) =>{
//                 console.log('Im running before the data of response is send',data);
//             })
//         );
//     }
// }
export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {}
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        console.log('Im running before a request is comming');
        return next.handle().pipe(
            map((data: any) => {
                console.log("Im running before data or response send ",data);
                return plainToClass(this.dto,data,{
                    excludeExtraneousValues:true,
                });
            })
        )
    }
}