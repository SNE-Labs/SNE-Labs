// import { publicClient } from '../lib/viem-client'; // TODO: Usar no Sprint 5
import type { Address } from '../types/passport';
import type { License, KeyRecord, BoxRecord } from '../types/passport';

/**
 * Service para interagir com contratos SNE na Scroll L2
 * 
 * TODO (Sprint 5): Implementar leituras on-chain reais
 * Por enquanto, funções stubbed retornam arrays vazios
 */

// Endereços dos contratos SNE (serão configurados quando disponíveis)
// const SNELicenseRegistry = '0x0000000000000000000000000000000000000000' as Address; // TODO: Adicionar endereço real
// const SNEKeysContract = '0x0000000000000000000000000000000000000000' as Address; // TODO: Adicionar endereço real
// const SNEBoxesContract = '0x0000000000000000000000000000000000000000' as Address; // TODO: Adicionar endereço real

/**
 * Busca licenças associadas a um endereço
 * @param _address Endereço Ethereum/Scroll
 * @returns Array de licenças
 */
export async function getLicensesForAddress(_address: Address): Promise<License[]> {
  // TODO (Sprint 5): Implementar leitura on-chain do SNELicenseRegistry
  // Por enquanto retorna array vazio
  try {
    // Exemplo futuro:
    // const licenses = await publicClient.readContract({
    //   address: SNELicenseRegistry,
    //   abi: SNELicenseRegistryABI,
    //   functionName: 'getLicensesForAddress',
    //   args: [address],
    // });
    // return licenses;
    
    return [];
  } catch (error) {
    console.error('Error fetching licenses:', error);
    return [];
  }
}

/**
 * Busca keys associadas a um endereço
 * @param _address Endereço Ethereum/Scroll
 * @returns Array de keys
 */
export async function getKeysForAddress(_address: Address): Promise<KeyRecord[]> {
  // TODO (Sprint 5): Implementar leitura on-chain
  try {
    return [];
  } catch (error) {
    console.error('Error fetching keys:', error);
    return [];
  }
}

/**
 * Busca boxes associadas a um endereço
 * @param _address Endereço Ethereum/Scroll
 * @returns Array de boxes
 */
export async function getBoxesForAddress(_address: Address): Promise<BoxRecord[]> {
  // TODO (Sprint 5): Implementar leitura on-chain
  try {
    return [];
  } catch (error) {
    console.error('Error fetching boxes:', error);
    return [];
  }
}

/**
 * Verifica acesso de uma licença específica
 * @param _nodeId Node ID ou token ID
 * @returns true se tem acesso, false caso contrário, null se erro
 */
export async function checkLicenseAccess(_nodeId: string): Promise<boolean | null> {
  // TODO (Sprint 5): Implementar verificação on-chain
  try {
    return null;
  } catch (error) {
    console.error('Error checking license access:', error);
    return null;
  }
}

