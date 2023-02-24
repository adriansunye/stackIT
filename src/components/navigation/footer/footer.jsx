import React from "react";
import { Box, Stack, Typography, Link } from "@mui/material";

//sring to render on footer
const company = ["About us", "Careers", "Blog", "Pricing"];
const resources = ["Proposal template", "Tutorial", "Invoices", "Freebies"];

function Footer() {
    return (
        <Box px={{ xs: "2%", sm: "7%" }}  mt={5} className="footer" color="#ffffff">
            <Stack
                textAlign={{ xs: "center", sm: "left" }}
                direction={{ xs: "column", sm: "row" }}
                py={{ xs: "7%", sm: "4%" }}
                spacing={{ xs: 3 }}
            >
                <Box flex="0.5" boxSizing="border-box">
                    <Typography variant="h6" fontWeight="500" mb="20px">
                        Stack-IT
                    </Typography>
                    <Typography variant="body2" width={{ xs: "100%", sm: "90%" }}>
                        Yet bed any for travelling assistance indulgence unpleasing. Not
                        thoughts all exercise blessing. Indulgence way everything joy
                        alteration boisterous the attachment.
                    </Typography>
                </Box>
                <Stack flex="0.16" gap={{ sx: "9px", sm: "12px" }}>
                    <Typography varaint="body1" fontWeight="500">
                        Company
                    </Typography>
                    {company.map((item) => (
                        <Link
                            key={item}
                            className="footer-link"
                            href="#"
                            color="inherit"
                            variant="body2"
                        >
                            {item}
                        </Link>
                    ))}
                </Stack>
                <Stack flex="0.16" gap={{ sx: "9px", sm: "12px" }}>
                    <Typography varaint="body1" fontWeight="500">
                        Resources
                    </Typography>
                    {resources.map((item) => (
                        <Link
                            key={item}
                            className="footer-link"
                            href="#"
                            color="inherit"
                            variant="body2"
                        >
                            {item}
                        </Link>
                    ))}
                </Stack>
            </Stack>
        </Box>
    );
}

export default Footer;
