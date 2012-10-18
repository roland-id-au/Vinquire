using System.Web;
using System.Web.Optimization;

namespace Vinquire
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            
            
            var scripts = new ScriptBundle("~/scripts").Include(
                "~/Assets/scripts/jquery-*",
                "~/Assets/scripts/bootstrap/bootstrap.js*",
                "~/Assets/scripts/vin.js"
            );
            //scripts.Transforms.Add(new JsMinify());

            bundles.Add(scripts);

            //bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
            //            "~/Scripts/jquery.unobtrusive*",
            //            "~/Scripts/jquery.validate*"));

            //bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
            //            "~/Scripts/modernizr-*"));

            var styles = new StyleBundle("~/styles").Include(
                "~/Assets/styles/home.less"
            );
            //styles.Transforms.Add(new LessMinify());
            //styles.Transforms.Add(new CssMinify());

            bundles.Add(styles);
        }
    }
}