using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Diagnostics;
using dotless.Core.Loggers;

namespace Vinquire.Infrastructure
{
    public class DebugLogger : Logger
    {
        public DebugLogger(LogLevel level) : base(level) { }

        protected override void Log(string message)
        {
            System.Diagnostics.Debug.WriteLine(message);
        }
    }
}