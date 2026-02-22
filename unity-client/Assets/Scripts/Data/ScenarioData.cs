using System.Xml.Serialization;
using System.Collections.Generic;

namespace DisasterSimulator.Data
{
    [XmlRoot("scenario")]
    public class Scenario
    {
        [XmlElement("name")]
        public string Name { get; set; }

        [XmlElement("ngoCount")]
        public int NgoCount { get; set; }

        [XmlElement("duration")]
        public long Duration { get; set; }

        [XmlElement("hoursInDay")]
        public float HoursInDay { get; set; }

        [XmlElement("mode")]
        public string Mode { get; set; }

        [XmlElement("ngo")]
        public List<NGO> Ngos { get; set; }

        [XmlElement("tag")]
        public List<string> Tags { get; set; }

        [XmlElement("event")]
        public List<Event> Events { get; set; }

        [XmlElement("library")]
        public List<LibraryItem> Library { get; set; }
    }

    public class NGO
    {
        [XmlElement("name")]
        public string Name { get; set; }

        [XmlElement("passkey")]
        public string Passkey { get; set; }
    }

    public class Event
    {
        [XmlElement("recipient")]
        public string Recipient { get; set; }

        [XmlElement("subject")]
        public string Subject { get; set; }

        [XmlElement("time")]
        public string TimeString { get; set; }

        [XmlElement("type")]
        public string Type { get; set; }

        [XmlElement("location")]
        public string Location { get; set; }
    }

    public class LibraryItem
    {
        [XmlElement("subject")]
        public string Subject { get; set; }

        [XmlElement("type")]
        public string Type { get; set; }

        [XmlElement("location")]
        public string Location { get; set; }
    }
}
