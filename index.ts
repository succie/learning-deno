import { Application } from "https://deno.land/x/oak/mod.ts";
import { ErrorStatus } from "https://deno.land/x/oak/types.ts";

import { add, sub, mul, div } from "./calculate.ts";

type RequestBody = {
  type: "add" | "sub" | "mul" | "div";
  values: number[];
};

const validation = (
  body: any,
  code: number = ErrorStatus.InternalServerError,
  message: string = ""
): undefined | Error => {
  if (
    !Object.hasOwnProperty.call(body, "type") ||
    !["add", "sub", "mul", "div"].includes(body.type)
  ) {
    throw { code, message };
  }

  if (
    !Object.hasOwnProperty.call(body, "values") ||
    !Array.isArray(body.values)
  ) {
    throw { code, message };
  }

  return;
};

const app = new Application();

app.use(async (ctx) => {
  const requestBody = await ctx.request.body({
    contentTypes: { json: ["application/json"] },
  });

  const rb: RequestBody = requestBody.value;

  try {
    validation(rb, ErrorStatus.BadRequest);

    let result = 0;
    switch (rb.type) {
      case "add": {
        result = add(...rb.values);
        break;
      }
      case "sub": {
        result = sub(...rb.values);
        break;
      }
      case "mul": {
        result = mul(...rb.values);
        break;
      }
      case "div": {
        result = div(...rb.values);
        break;
      }
      default: {
        throw { code: ErrorStatus.BadRequest };
      }
    }

    ctx.response.body = result;
  } catch (err) {
    console.log("err", err);
    ctx.throw(err.code, err.message);
  }
});

await app.listen({ port: 8080 });
