import React from "react";
import { Container, Box } from "@chakra-ui/react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import inforforjudge from "../../Assets/mootcourt/inforforjudge.pdf";
import Header from "../../Navbar/Header";
import Footer from "../../Navbar/Footer";

const InformationOfJudges = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Container
      minW="100%"
      minH="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box w="100%" h="700px">
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
          <Viewer fileUrl={inforforjudge} plugins={[defaultLayoutPluginInstance]} />
        </Worker>
      </Box>
    </Container>
  );
};

export default InformationOfJudges;
