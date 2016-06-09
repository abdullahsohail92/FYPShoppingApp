using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ShopingApp.Startup))]
namespace ShopingApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
