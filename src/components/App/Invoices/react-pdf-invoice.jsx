import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
    color: "#333",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dateHeader: {
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    paddingBottom: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 12,
  },
  label: {
    fontWeight: "bold",
    color: "#000",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  column: {
    width: "48%",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottom: "1 solid #ccc",
    paddingBottom: 4,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1 solid #eee",
    paddingVertical: 4,
  },
  cell: {
    flexGrow: 1,
    textAlign: "left",
  },
  totalSection: {
    marginTop: 10,
    alignItems: "flex-end",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "30%",
  },
  noteSection: {
    marginTop: 20,
  },
});

// Component
export function ReactInvoicePdf({ data }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.dateHeader}>
            <Text style={styles.title}>Invoice</Text>
            <Text>
              Invoice No:{" "}
              <Text style={{ fontWeight: "bold" }}>{data.invoice_number}</Text>
            </Text>
            <Text>Issue Date: {data.issue_date}</Text>
            <Text>Due Date: {data.due_date}</Text>
          </View>
          {data.logo && (
            <Image
              style={styles.logo}
              src={data.logo}
              alt={data.invoice_number}
            />
          )}
        </View>

        {/* From / To */}
        <View style={styles.infoRow}>
          <View style={styles.column}>
            <Text style={styles.label}>From</Text>
            <Text>{data.from.name}</Text>
            <Text>{data.from.contact_person}</Text>
            <Text>{data.from.email}</Text>
            <Text>{data.from.phone}</Text>
            <Text>{data.from.address}</Text>
            <Text>TAX ID: {data.from.tax_id || "Not provided"}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>To</Text>
            <Text>{data.to.name}</Text>
            <Text>{data.to.contact_person}</Text>
            <Text>{data.to.email}</Text>
            <Text>{data.to.phone}</Text>
            <Text>{data.to.address}</Text>
            <Text>TAX ID: {data.to.tax_id || "N/A"}</Text>
          </View>
        </View>

        {/* Items Table */}
        <View>
          <View style={styles.tableHeader}>
            <Text style={[styles.cell, { flex: 4 }]}>Description</Text>
            <Text style={[styles.cell, { flex: 1 }]}>Qty</Text>
            <Text style={[styles.cell, { flex: 2 }]}>Price</Text>
            <Text style={[styles.cell, { flex: 2 }]}>Total</Text>
          </View>

          {data.items.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={[styles.cell, { flex: 4 }]}>{item.description}</Text>
              <Text style={[styles.cell, { flex: 1 }]}>{item.quantity}</Text>
              <Text style={[styles.cell, { flex: 2 }]}>
                ₹{item.price.toLocaleString("en-IN")}
              </Text>
              <Text style={[styles.cell, { flex: 2 }]}>
                ₹{item.total.toLocaleString("en-IN")}
              </Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text>Subtotal:</Text>
            <Text>₹{data.subtotal.toLocaleString("en-IN")}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Tax ({data.tax_rate}%):</Text>
            <Text>₹{data.tax.toLocaleString("en-IN")}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.label}>Total:</Text>
            <Text style={styles.label}>
              ₹{data.total.toLocaleString("en-IN")}
            </Text>
          </View>
        </View>

        {/* Payment and Note */}
        <View style={styles.noteSection}>
          <Text style={styles.label}>Payment Details</Text>
          <Text>{data.payment_details || "N/A"}</Text>

          <Text style={[styles.label, { marginTop: 10 }]}>Note</Text>
          <Text>{data.note || "Thank you!"}</Text>
        </View>
      </Page>
    </Document>
  );
}
