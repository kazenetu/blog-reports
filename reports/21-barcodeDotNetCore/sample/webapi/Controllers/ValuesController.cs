using Microsoft.AspNetCore.Mvc;
using System.IO;
using ZXing;
using ZXing.Common;

namespace webapi.Controllers
{
  [Route("api/[controller]")]
  public class ValuesController : Controller
  {
    // GET api/values
    [HttpGet]
    public ActionResult Get()
    {
      //QRコード化する文字列
      var data = "test";

      //QRコード画像の大きさを指定(pixel)
      int size = 200;

      try
      {
        // バーコード情報の設定

        // バーコード例
        //var writer = new BarcodeWriterPixelData
        //{
        //  Format = BarcodeFormat.CODE_128,
        //  Options = new EncodingOptions
        //  {
        //    Height = size / 5,
        //    Width = size
        //  }
        //};

        // QRコード例
        var writer = new BarcodeWriterPixelData
        {
          Format = BarcodeFormat.QR_CODE,
          Options = new EncodingOptions
          {
            Margin = 0,
            Height = size,
            Width = size
          }
        };

        // バーコード出力
        var pixelData = writer.Write(data);

        // バーコードイメージを取得し、リクエストとして返す
        using (var bitmap = new System.Drawing.Bitmap(pixelData.Width, pixelData.Height, System.Drawing.Imaging.PixelFormat.Format32bppRgb))
        using (var ms = new MemoryStream())
        {
          // lock the data area for fast access
          var bitmapData = bitmap.LockBits(new System.Drawing.Rectangle(0, 0, pixelData.Width, pixelData.Height),
             System.Drawing.Imaging.ImageLockMode.WriteOnly, System.Drawing.Imaging.PixelFormat.Format32bppRgb);
          try
          {
            // we assume that the row stride of the bitmap is aligned to 4 byte multiplied by the width of the image
            System.Runtime.InteropServices.Marshal.Copy(pixelData.Pixels, 0, bitmapData.Scan0,
               pixelData.Pixels.Length);
          }
          finally
          {
            bitmap.UnlockBits(bitmapData);
          }

          // PNGとしてMemoryStreamに出力
          bitmap.Save(ms, System.Drawing.Imaging.ImageFormat.Png);
          ms.Position = 0;

          // ファイルデータとして返す
          return File(ms.GetBuffer(), "image/png");

        }
      }
      catch (WriterException e)
      {
        return BadRequest(e.Message);
      }
    }

    // GET api/values/5
    [HttpGet("{id}")]
    public string Get(int id)
    {
      return "value";
    }

    // POST api/values
    [HttpPost]
    public void Post([FromBody]string value)
    {
    }

    // PUT api/values/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody]string value)
    {
    }

    // DELETE api/values/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }
}
