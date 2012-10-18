using System.Web;
using System.Web.Optimization;

namespace Vinquire
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            
            
            var scripts = new ScriptBundle("~/js").Include(
                "~/Content/themes/base/js/jquery-*",
                "~/Content/themes/base/js/bootstrap.js*",
                "~/Content/js/vin.js"
            );
            //scripts.Transforms.Add(new JsMinify());

            bundles.Add(scripts);

            //bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
            //            "~/Scripts/jquery.unobtrusive*",
            //            "~/Scripts/jquery.validate*"));

            //bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
            //            "~/Scripts/modernizr-*"));

            var styles = new StyleBundle("~/styles").Include("~/Content/site.less");
            styles.Transforms.Add(new LessMinify());
            styles.Transforms.Add(new CssMinify());

            bundles.Add(styles);
        }
    }
}