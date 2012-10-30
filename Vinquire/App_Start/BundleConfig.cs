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
                "~/Assets/scripts/bootstrap/bootstrap.js*"
                //"~/Assets/scripts/vin.js"
            );

            bundles.Add(scripts);

            var vinBundle = new ScriptBundle("~/scripts/vin").Include(
                "~/Assets/scripts/vin/vin-format.js",
                "~/Assets/scripts/vin/vin-wmi.js",
                "~/Assets/scripts/vin/vin-iso3833.js",
                "~/Assets/scripts/vin/vin-pre1981.js",
                "~/Assets/scripts/vin/vin-input.js"
            );

            bundles.Add(vinBundle);

            var vinSearchBundle = new ScriptBundle("~/scripts/home").Include("~/Assets/scripts/vin-search.js");

            bundles.Add(vinSearchBundle);



            //scripts.Transforms.Add(new JsMinify());



            //bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
            //            "~/Scripts/jquery.unobtrusive*",
            //            "~/Scripts/jquery.validate*"));

            //bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
            //            "~/Scripts/modernizr-*"));

            var styles = new StyleBundle("~/styles").Include(
                "~/Assets/styles/index.less"
            );
            styles.Transforms.Add(new LessMinify());
            //styles.Transforms.Add(new CssMinify());

            bundles.Add(styles);
        }
    }
}