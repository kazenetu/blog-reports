using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace webapi
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      // SwaggerGenサービスの登録
      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new Swashbuckle.AspNetCore.Swagger.Info { Title = "My API", Version = "v1" });

        // XMLコメントを反映
        var xmlFile = $"{System.Reflection.Assembly.GetEntryAssembly().GetName().Name}.xml";
        var xmlPath = System.IO.Path.Combine(AppContext.BaseDirectory, xmlFile);
        c.IncludeXmlComments(xmlPath);
      });

      services.AddMvc();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      // Swaggerミドルウェアの登録
      app.UseSwagger();

      // SwaggerUIミドルウェアの登録
      app.UseSwaggerUI(c =>
      {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");

        // カスタマイズしたHTMLファイルを指定
        c.IndexStream = () =>
        {
          using (var readStream = new System.IO.StreamReader($"{AppContext.BaseDirectory}swaggerIndex.html"))
          {
            var html = readStream.ReadToEnd();

            return new System.IO.MemoryStream(System.Text.Encoding.UTF8.GetBytes(html));
          }
        };
      });

      app.UseMvc();
    }
  }
}
